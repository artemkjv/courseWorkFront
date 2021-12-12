import studentApi from '@/api/student'

const state = {
    student: null,
    isLoading: false,
    validationErrors: null,
    isSubmitting: false
}

export const mutationTypes = {
    getStudentStart: '[student] getStudentStart',
    getStudentSuccess: '[student] getStudentSuccess',
    getStudentFailure: '[student] getStudentFailure',
    updateStudentStart: '[student] updateStudentStart',
    updateStudentSuccess: '[student] updateStudentSuccess',
    updateStudentFailure: '[student] updateStudentFailure',
    createStudentStart: '[student] createStudentStart',
    createStudentSuccess: '[student] createStudentSuccess',
    createStudentFailure: '[student] createStudentFailure'
}

const mutations = {
    [mutationTypes.getStudentStart](state){
        state.isLoading = true
        state.student = null
    },
    [mutationTypes.getStudentSuccess](state, payload){
        state.isLoading = false
        state.student = payload
    },
    [mutationTypes.getStudentFailure](state){
        state.isLoading = false
    },
    [mutationTypes.updateStudentStart](state){
        state.isSubmitting = true
    },
    [mutationTypes.updateStudentSuccess](state){
        state.isSubmitting = false
    },
    [mutationTypes.updateStudentFailure](state, validationErrors){
        state.isSubmitting = false
        state.validationErrors = validationErrors
    },
    [mutationTypes.createStudentStart](state){
        state.isSubmitting = true
    },
    [mutationTypes.createStudentSuccess](state){
        state.isSubmitting = false
    },
    [mutationTypes.createStudentFailure](state, validationErrors){
        state.isSubmitting = false
        state.validationErrors = validationErrors
    }
}

export const actionTypes = {
    getStudent: '[student] getStudent',
    updateStudent: '[student] updateStudent',
    createStudent: '[student] createStudent'
}

const actions = {
    [actionTypes.getStudent](context, {id}){
        return new Promise(resolve => {
            context.commit(mutationTypes.getStudentStart)
            studentApi.getStudent(id)
                .then(student => {
                    context.commit(mutationTypes.getStudentSuccess, student)
                    resolve(student)
                })
                .catch(() => {
                    context.commit(mutationTypes.getStudentFailure)
                })
        })
    },
    [actionTypes.updateStudent](context, {id, student}){
        return new Promise(resolve => {
            context.commit(mutationTypes.updateStudentStart)
            studentApi.updateStudent(id, student)
                .then(student => {
                    context.commit(mutationTypes.updateStudentSuccess)
                    resolve(student)
                })
                .catch(result => {
                    context.commit(mutationTypes.updateStudentFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.createStudent](context, {student}){
        return new Promise(resolve => {
            context.commit(mutationTypes.createStudentStart)
            studentApi.storeStudent(student)
                .then(student => {
                    context.commit(mutationTypes.createStudentSuccess)
                    resolve(student)
                })
                .catch(result => {
                    context.commit(mutationTypes.updateStudentFailure, result.response.data.errors)
                })
        })
    }

}

export default {
    state,
    mutations,
    actions
}