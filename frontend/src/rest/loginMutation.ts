import { useMutate } from 'restful-react'

type LoginMutation = {
    email: string
    password: string
}

export const useLoginMutation = () =>
    useMutate<any, any, any, LoginMutation>({
        verb: "POST",
        path: `/auth/login`
    })
