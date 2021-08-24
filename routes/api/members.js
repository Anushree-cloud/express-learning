const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')

//get all members
router.get('/', (req, res) => {
    res.json(members)
})

//get a single member by id
router.get('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id))
    found ? (
        res.json(members.filter((member) => member.id === parseInt(req.params.id)))
        ) : (
        res.status(400).json({ msg : "Member not found!"})
        )
    
})

//create member
router.post('/', (req, res) => {
    // res.send(req.body)
    const newMember = {
        ...req.body,
        id: uuid.v4(),
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: "Please enter a valid name or email!"})
    }

    members.push(newMember)
    res.json(members)
    res.redirect('/')
})

//update member
router.put('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id))
    if(found){
        const updatedMember = req.body
        members.map((member) => {
            if(member.id === parseInt(req.params.id)){
                member.name = updatedMember.name ? updatedMember.name : member.name
                member.email = updatedMember.email ? updatedMember.email : member.email
            }
            res.json({ msg: 'Member updated!', member})
        })
    }
    else{
        res.status(400).json({ msg : "Member not found!"})
    }
})

//delete member
router.delete('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id))
    found ? (
        res.json({members: members.filter((member) => member.id !== parseInt(req.params.id)), msg: 'member deleted'})
        ) : (
        res.status(400).json({ msg : "Member not found!"})
        )
    
})

module.exports = router;