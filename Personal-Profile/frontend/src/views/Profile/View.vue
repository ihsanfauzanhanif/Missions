<template>
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2">
                        <img alt="" v-bind:src="profile.photo" class="img-fluid rounded">
                    </div>
                    <div class="col-md-3 text-start profile-title">
                        <h4>{{ profile.name }}</h4>
                        <p class="text-muted m-0 mb-3">A.K.A {{ profile.nickname }}</p>
                        <a v-bind:href="`mailto:${profile.email}`" class="btn btn-success">Contact Me</a> 
                        <router-link :to="{name: 'profileEdit' }" class="btn btn-info ms-2">Edit Data</router-link>
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
    <div class="col-md-12 text-start my-3">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title profile-label">
                            Introduction
                        </div>
                        <div class="card-text">
                            <!-- <p>Studies at Politeknik Negeri Bandung</p> -->
                            <p>Created at {{ profile.createdAt.split('T')[0] }}</p>
                            <p>{{ profile.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title profile-label">About Me</div>
                        <div class="card-text">
                            {{ profile.about_me }}
                        </div>
                        <hr>
                        <div class="card-title profile-label">
                            Skill
                        </div>
                        <div class="card-text">
                            {{ profile.skills }}
                        </div>
                        <hr>
                        <div class="card-title profile-label">
                            Languages
                        </div>
                        <div class="card-text">
                            {{ profile.languages }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                Recently Added Profiles
                <div class="rec-box" v-for="(item) in profile.recently" :key="item._id">
                    <div class="row">
                        <div class="col-md-4">
                            <img alt="{{ item.name }}" v-bind:src="item.photo" class="img-fluid rounded">
                        </div>
                        <div class="col-md-8">
                            <a class="profile-rec" v-bind:href="`${item._id}`">{{ item.name }}</a>
                            <p>at {{ item.createdAt.split('T')[0] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import DataTable from 'datatables.net-vue3'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faAdd, faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(faAdd, faPencilAlt, faTrash, faEye)

// let table = {
//     id: 'table-list',
//     columns: [
//         { data: 'no', title: 'No' },
//         { data: 'name', title: 'Name' },
//         { data: 'email', title: 'E-mail Address' },
//         { data: 'status', title: 'Status' },
//         { data: 'last_created', title: 'Last Created' },
//         { data: 'last_updated', title: 'Last Updated' },
//         { data: 'actions', title: 'Actions' }
//     ],
// }

import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export default {
    // name: 'Home',
    // data() {
    //     return {
    //         table: table
    //     }
    // },
    // components: {
    //     'font-awesome-icon': FontAwesomeIcon,
    //     DataTable
    // },
    // mounted() {
    // }


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
            createdAt: '',
            _id: '',
            recently: []
        })

        const route = useRoute()

        onMounted(() => {
            axios.get(`http://localhost:3000/api/profile/${route.params.id}`)
            .then(async res => {
                profile._id = res.data.profile._id
                profile.name = res.data.profile.name
                profile.nickname = res.data.profile.nickname
                profile.username = res.data.profile.username
                profile.password = res.data.profile.password
                profile.email = res.data.profile.email
                profile.dob = res.data.profile.dob
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
                res.data.recently.forEach(r => {
                    let imgBlob = new Blob([new Uint8Array(r.photo.data)])
                    imgBlob.text().then(data => {
                        r.photo = data
                    })
                    .finally(() => {
                        profile.recently.push(r)
                    })
                    console.log(r)
                })
            })
            .catch(err => {
                console.log(err.response.data)
            })
        })

        return {
            profile
        }
    }
}
</script>

<style>
@import 'datatables.net-dt';
.profile-title {
    padding-top: 3rem;
}

.profile-title > h4{
    font-weight: 600;
}

.profile-rec {
    font-size: 16px;
    text-decoration: none;
    color: rgb(59, 61, 68);
    font-weight: 500;
}

.rec-box {
    border-bottom: 1px solid rgb(216, 216, 216);
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
}
.rec-box:is(:last-of-type) {
    border-bottom: none;
}

.profile-label {
    font-size: 16px;
    font-weight: 600;
}
</style>