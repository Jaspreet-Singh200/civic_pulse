import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import {User,Department,Complaint,ComplaintHistory} from './models.js'

if(!process.env.MONGODB_URI)throw new Error('Set MONGODB_URI in server/.env first.')
await mongoose.connect(process.env.MONGODB_URI)
const departments=await Promise.all([
  Department.findOneAndUpdate({name:'Roads & Infrastructure'},{name:'Roads & Infrastructure',category:['Roads & potholes','Public infrastructure']},{upsert:true,new:true}),
  Department.findOneAndUpdate({name:'Water & Sanitation'},{name:'Water & Sanitation',category:['Water leakage','Blocked drainage','Public sanitation','Garbage accumulation']},{upsert:true,new:true}),
  Department.findOneAndUpdate({name:'Electrical Services'},{name:'Electrical Services',category:['Street lighting']},{upsert:true,new:true}),
])
const defaults=[
  {name:'Demo Resident',email:'citizen@civicpulse.local',password:'CitizenDemo123!',role:'citizen'},
  {name:'Demo Officer',email:'officer@civicpulse.local',password:'OfficerDemo123!',role:'officer',department:departments[0]._id},
  {name:'Demo Administrator',email:'admin@civicpulse.local',password:'AdminDemo123!',role:'admin'},
]
const users={}
for(const u of defaults){let found=await User.findOne({email:u.email});if(!found)found=await User.create({...u,password:await bcrypt.hash(u.password,12)});users[u.role]=found}
if(await Complaint.countDocuments()===0){
 const examples=[
  {category:'Roads & potholes',description:'Large pothole near the bus stop. It is difficult for two-wheelers to avoid during evening traffic.',address:'100 Feet Road, Indiranagar',coordinates:[77.6412,12.9784],severity:'high',status:'in_progress',department:departments[0]._id,officer:users.officer._id},
  {category:'Street lighting',description:'Streetlight on the corner has stopped working, leaving the pedestrian crossing dark after sunset.',address:'12th Main, Indiranagar',coordinates:[77.6384,12.9768],severity:'medium',status:'resolved',department:departments[2]._id,officer:users.officer._id},
  {category:'Blocked drainage',description:'Drain is blocked and water is pooling over the footpath after rain.',address:'CMH Road, Indiranagar',coordinates:[77.6401,12.9821],severity:'medium',status:'pending_verification',department:departments[1]._id},
 ]
 for(const [i,item] of examples.entries()){const complaint=await Complaint.create({...item,citizen:users.citizen._id,location:{type:'Point',coordinates:item.coordinates},reference:`CP-DEMO-00${i+1}`,votes:i+2,...(item.status==='resolved'?{resolvedAt:new Date()}: {})});await ComplaintHistory.create({complaint:complaint._id,actor:users.citizen._id,status:'pending_verification',note:'Demo report submitted'});if(item.status!=='pending_verification')await ComplaintHistory.create({complaint:complaint._id,actor:users.admin._id,status:item.status,note:`Demo status: ${item.status.replaceAll('_',' ')}`})}
}
console.log('Seed complete. Demo accounts: citizen@civicpulse.local / CitizenDemo123!, officer@civicpulse.local / OfficerDemo123!, admin@civicpulse.local / AdminDemo123!')
await mongoose.disconnect()
