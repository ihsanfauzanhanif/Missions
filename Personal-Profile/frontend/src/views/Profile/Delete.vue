<template>
    <div class="text-start col-md-12">
        <router-link :to="{name: 'profileIndex'}" class="btn btn-primary mb-3">Go Back</router-link>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2">
                        <img alt="" v-bind:src="profile.photo" class="img-fluid rounded">
                    </div>
                    <div class="col-md-3 text-start profile-title">
                        <h4>{{ profile.name }}</h4>
                        <p class="text-muted m-0 mb-3">A.K.A {{ profile.nickname }}</p>
                    </div>
                    <div class="col-md-7 text-start">
                        <div class="mt-4 pb-3 mx-md-5 border-bottom border-1">
                            <div class="row">
                                <div class="col-md-4">
                                    Date of Birth
                                    <p class="mt-2">{{ profile.dob.split('T')[0] }}</p>
                                </div>
                                <div class="col-md-4">
                                    Phone Number
                                    <p class="mt-2">{{ profile.phone }}</p>
                                </div>
                                <div class="col-md-4">
                                    Hobby
                                    <p class="mt-2">{{ profile.hobby }}</p>
                                </div>
                            </div>
                        </div><div class="mt-4 mx-md-5">
                            <div class="row">
                                <div class="col-md-12">
                                    Address
                                    <p class="mt-2">{{ profile.address }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-start col-md-12 mt-3">
        <div class="alert alert-danger">
                Are you sure want to delete this profile? This action is irreversible!
        </div>
    </div>
    <div class="mt-3 mb-5 float-end">
        <button class="btn btn-danger py-3 px-4" type="button" @click="deleteData">Delete Profile</button>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive, defineComponent, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'


export default defineComponent({
    name: 'deleteProfile',
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

                let imgBlob = new Blob([new Uint8Array(res.data.profile.photo.data)])
                let img = await imgBlob.text()
                profile.photo = img
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

        function deleteData() {
            const url = `http://localhost:3000/api/profile/delete/${route.params.id}`
            axios.delete(url, {})
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
            deleteData,
            onEventFilePicked,
            router
        }
    },
    methods: {
    }
})
</script>