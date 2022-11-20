const Profile = require('../schemas/Profile')

module.exports = {
    all: async (req, res) => {
        let profile = await Profile.find({
            deletedAt: null
        })
        return res.status(200).json({
            profile: profile
        })
    },
    create: async(req, res) => {
        let profile = {
            name: req.body.name || '',
            nickname: req.body.nickname || '',
            username: req.body.username || '',
            password: req.body.password || '',
            email: req.body.email || '',
            dob: req.body.dob || '',
            phone: req.body.phone || '',
            hobby: req.body.hobby || '',
            address: req.body.address || '',
            about_me: req.body.about_me || '',
            skills: req.body.skills || '',
            languages: req.body.languages || '',
            photo: req.body.photo || ''
        }

        let retVal = await Profile.create(profile)
        if (retVal) return res.status(200).json({
            message: 'insert success',
            data: retVal
        })
    },
    getById: async (req, res) => {
        let query = {
            _id: req.params.id,
            deletedAt: null
        }

        let profile = await Profile.findOne(query)
        let recently = await Profile.find().sort({createdAt: -1}).limit(5)
        return res.status(200).json({
            profile: profile,
            recently: recently
        })
    },
    updateById: async (req, res) => {
        
        let query = {
            _id: req.params.id,
            deletedAt: null
        }
        let data = {
            name: req.body.name || '',
            nickname: req.body.nickname || '',
            username: req.body.username || '',
            password: req.body.password || '',
            email: req.body.email || '',
            dob: req.body.dob || '',
            phone: req.body.phone || '',
            hobby: req.body.hobby || '',
            address: req.body.address || '',
            about_me: req.body.about_me || '',
            skills: req.body.skills || '',
            languages: req.body.languages || '',
            photo: req.body.photo || ''
        }
        data = Object.entries(data).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {})
        let profile = await Profile.findOneAndUpdate(query, {$set: data})
        if (profile) return res.status(200).json({
            message: 'update success',
            data: profile
        })
    },
    deleteById: async (req, res) => {
        
        let query = {
            _id: req.params.id,
            deletedAt: null
        }

        let data = {
            deletedAt: new Date()
        }

        let profile = await Profile.findOneAndUpdate(query, {$set: data})
        if (profile) return res.status(200).json({
            message: 'delete success',
            data: profile
        })

    }
}