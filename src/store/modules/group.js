import groupApi from '@/api/group'

const state = {
    group: null,
    isLoading: false,
    validationErrors: null,
    isSubmitting: false
}

export const mutationTypes = {
    getGroupStart: '[group] getGroupStart',
    getGroupSuccess: '[group] getGroupSuccess',
    getGroupFailure: '[group] getGroupFailure',
    updateGroupStart: '[group] updateGroupStart',
    updateGroupSuccess: '[group] updateGroupSuccess',
    updateGroupFailure: '[group] updateGroupFailure',
    createGroupStart: '[group] createGroupStart',
    createGroupSuccess: '[group] createGroupSuccess',
    createGroupFailure: '[group] createGroupFailure'
}

const mutations = {
    [mutationTypes.getGroupStart](state){
        state.isLoading = true
        state.group = null
    },
    [mutationTypes.getGroupSuccess](state, payload){
        state.isLoading = false
        state.group = payload
    },
    [mutationTypes.getGroupFailure](state){
        state.isLoading = false
    },
    [mutationTypes.updateGroupStart](state){
        state.isSubmitting = true
    },
    [mutationTypes.updateGroupSuccess](state){
        state.isSubmitting = false
    },
    [mutationTypes.updateGroupFailure](state, validationErrors){
        state.isSubmitting = false
        state.validationErrors = validationErrors
    },
    [mutationTypes.createGroupStart](state){
        state.isSubmitting = true
    },
    [mutationTypes.createGroupSuccess](state){
        state.isSubmitting = false
    },
    [mutationTypes.createGroupFailure](state, validationErrors){
        state.isSubmitting = false
        state.validationErrors = validationErrors
    }
}

export const actionTypes = {
    getGroup: '[group] getGroup',
    updateGroup: '[group] updateGroup',
    createGroup: '[group] createGroup'
}

const actions = {
    [actionTypes.getGroup](context, {id}){
        return new Promise(resolve => {
            context.commit(mutationTypes.getGroupStart)
            groupApi.getGroup(id)
                .then(group => {
                    context.commit(mutationTypes.getGroupSuccess, group)
                    resolve(group)
                })
                .catch(() => {
                    context.commit(mutationTypes.getGroupFailure)
                })
        })
    },
    [actionTypes.updateGroup](context, {id, group}){
        return new Promise(resolve => {
            context.commit(mutationTypes.updateGroupStart)
            groupApi.updateGroup(id, group)
                .then(group => {
                    context.commit(mutationTypes.updateGroupSuccess)
                    resolve(group)
                })
                .catch(result => {
                    context.commit(mutationTypes.updateGroupFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.createGroup](context, {group}){
        return new Promise(resolve => {
            context.commit(mutationTypes.createGroupStart)
            groupApi.storeGroup(group)
                .then(group => {
                    context.commit(mutationTypes.createGroupSuccess)
                    resolve(group)
                })
                .catch(result => {
                    context.commit(mutationTypes.updateGroupFailure, result.response.data.errors)
                })
        })
    }

}

export default {
    state,
    mutations,
    actions
}