<template>
    <form @submit.prevent="edit">
    <div class="text-start">
        <router-link :to="{name: 'profileIndex'}" class="btn btn-primary mb-3">Go Back</router-link>
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">Profile Picture</div>
                        <div class="card-text">
                            <input type="file" name="photo" @change="onEventFilePicked">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">Edit Profile Data</div>
                        <div class="card-text mt-4">
                            <div class="row">
                                <div class="col-md-8 mb-2">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" v-model="profile.name" class="form-control" id="name">
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label for="nickname" class="form-label">Nickname</label>
                                    <input type="text" v-model="profile.nickname" class="form-control" id="nickname">
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" v-model="profile.username" class="form-control" id="username">
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" v-model="profile.password" class="form-control" id="password">
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" v-model="profile.email" class="form-control" id="email">
                                </div>
                                <hr class="my-5">
                                <div class="col-md-12 mb-2">
                                    <label for="dob" class="form-label">Date of Birth</label>
                                    <input type="date" v-model="profile.dob.split('T')[0]" class="form-control" id="dob">
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="phone" v-model="profile.phone" class="form-control" id="phone">
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label for="hobby" class="form-label">Hobby</label>
                                    <input type="text" v-model="profile.hobby" class="form-control" id="hobby">
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label for="Address" class="form-label">Address</label>
                                    <textarea class="form-control" v-model="profile.address" rows="5" id="address"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mt-3">
                    <div class="card-body">
                        
                        <div class="col-md-12 mb-2">
                            <label for="about_me" class="form-label">About Me</label>
                            <textarea class="form-control" v-model="profile.about_me" rows="5" id="about_me"></textarea>
                        </div>
                        <div class="col-md-12 mb-2">
                            <label for="skills" class="form-label">Skills</label>
                            <input type="text" v-model="profile.skills" class="form-control" id="skills">
                        </div>
                        <div class="col-md-12 mb-2">
                            <label for="lang" class="form-label">Languages</label>
                            <input type="text" v-model="profile.languages" class="form-control" id="lang">
                        </div>
                    </div>
                </div>
                <div class="mt-3 mb-5 float-end">
                    <button class="btn btn-primary py-3 px-4" type="submit">Update Profile</button>
                </div>
            </div>
        </div>
    </div>
    </form>
</template>

<script>
import axios from 'axios'
import { reactive, defineComponent, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'


export default defineComponent({
    name: 'editProfile',
    emits: ['imageloaded'],
    setup() {
        const profile = reactive({
            name: '',
            nickname: '',
            username: '',
            password: '',
            email: '',
            dob: '',
            phone: '',
            hobby: '',
            address: '',
            about_me: '',
            skills: '',
            languages: '',
            photo: '',
        })
        const router = useRouter()

        const route = useRoute()


        onMounted(() => {
            axios.get(`http://localhost:3000/api/profile/${route.params.id}`)
            .then(async res => {
                profile.name = res.data.profile.name
                profile.nickname = res.data.profile.nickname
                profile.username = res.data.profile.username
                profile.password = res.data.profile.password
                profile.email = res.data.profile.email
                profile.dob = res.data.profile.dob? res.data.profile.dob.split('T')[0] : null
                profile.phone = res.data.profile.phone
                profile.hobby = res.data.profile.hobby
                profile.address = res.data.profile.address
                profile.about_me = res.data.profile.about_me
                profile.skills = res.data.profile.skills.join(',')
                profile.languages = res.data.profile.languages.join(',')
                profile.createdAt = res.data.profile.createdAt
            })
            .catch(err => {
                console.log(err)
            })
        })

        function onEventFilePicked (event) {
            const files = event.target.files
            const filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
              return alert('Por favor adicione um arquivo válido')
            }
            const fileReader = new FileReader()
            fileReader.onload = ((event) => {
                this.profile.photo = event.target.result
            }).bind(this)
            fileReader.readAsDataURL(files[0])
        }

        function edit() {
            const url = `http://localhost:3000/api/profile/edit/${route.params.id}`
            const formData = {
                name: this.profile.name,
                nickname: this.profile.nickname,
                username: this.profile.username,
                password: this.profile.password,
                email: this.profile.email,
                dob: this.profile.dob,
                phone: this.profile.phone,
                hobby: this.profile.hobby,
                address: this.profile.address,
                about_me: this.profile.about_me,
                skills: this.profile.skills,
                languages: this.profile.languages,
                photo: this.profile.photo
            }

            axios.patch(url, formData)
            .then(()=> {
                router.push({
                    name: 'profileIndex'
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        return {
            profile,
            edit,
            onEventFilePicked,
            router
        }
    },
    methods: {
        preFiles(event) {
            const f = event.target.files[0]
            if (f) {
                const reader = new FileReader()
                reader.onload = function(evt) { 
                    const contents = evt.target.result;
                    this.photo = contents
                    this.name = 'zan'
                };
                reader.readAsDataURL(f);
            }
        }
    }
})
</script>