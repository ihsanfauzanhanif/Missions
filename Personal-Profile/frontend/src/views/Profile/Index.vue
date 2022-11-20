<template>
    <div class="col-md-12 text-start">
        <router-link :to="{name: 'profileCreate'}" class="btn btn-success">
            <font-awesome-icon icon="fa-solid fa-add" />&nbsp;Create Data</router-link>
        <div class="card mt-4">
            <div class="card-body">
                <DataTable
                    :columns="table.columns"
                    :ajax="table.ajax"
                    class="display mt-3"
                    width="100%"
                >
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
import DataTable from 'datatables.net-vue3'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faAdd, faPencilAlt, faTrash, faEye)

let table = {
    id: 'table-list',
    columns: [
        {   data: '_id',
            title: 'No',
            mRender: function(data, type, full, meta) {
                return +meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        // { data: 'name', title: 'No' },
        { data: 'name', title: 'Name' },
        { data: 'email', title: 'E-mail Address' },
        { data: 'dob', title: 'Birth Date' },
        { data: 'createdAt', title: 'Last Created' },
        { data: 'updatedAt', title: 'Last Updated' },
        {   data: '_id',
            title: 'Action',
            mRender: function(data) {
                return `
                    <a href='/profile/${data}' class='btn btn-warning'>View</a>
                    <a href='/profile/edit/${data}' class='btn btn-info'>Edit</a>
                    <a href='/profile/delete/${data}' class='btn btn-danger'>Delete</button>
                `;
            }
        },
    ],
    ajax: {
        url: `http://localhost:3000/api/profile/all`,
        dataSrc: 'profile'
    }
}
export default {
    name: 'Home',
    data() {
        return {
            table: table
        }
    },
    setup() {
    },
    components: {
        'font-awesome-icon': FontAwesomeIcon,
        DataTable
    },
    methods: {
    }
}
</script>