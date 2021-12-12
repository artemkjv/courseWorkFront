import groupApi from '@/api/group'

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getGroupsStart: '[groups] Get groups start',
    getGroupsSuccess: '[groups] Get groups success',
    getGroupsFailure: '[groups] Get groups failure',
}

export const actionTypes = {
    getGroups: '[groups] Get groups'
}

const mutations = {
    [mutationTypes.getGroupsStart](state){
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getGroupsSuccess](state, payload){
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getGroupsFailure](state){
        state.isLoading = false
    }
}

const actions = {
    [actionTypes.getGroups](context, {apiUrl}){
        return new Promise(resolve => {
            context.commit(mutationTypes.getGroupsStart)
            groupApi.getGroups(apiUrl)
                .then(response => {
                    context.commit(mutationTypes.getGroupsSuccess, response.data)
                    resolve(response.data)
                })
                .catch(() => {
                    context.commit(mutationTypes.getGroupsFailure)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}