// import { createSlicec,createApi } from "@reduxjs/toolkit"
import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const todoSlice = createApi(
    {
        reducerPath: "todoSlice",
        tagTypes:["todoSlice"],
        baseQuery: fetchBaseQuery({baseUrl: "https://669e48cb9a1bda3680061d52.mockapi.io/todolist"}),
        endpoints: (builder) => (
            {
                getData: builder.query(
                    {
                        query: () => "",
                        providesTags: (result) =>
                            result ?
                        [
                            ...result.map(({id}) => ({type:"todoSlice" , id})),
                            {type:"todoSlice" , id:"LIST"}
                        ] :
                        [{type:"todoSlice" , id:"LIST"}]
                    }
                ),
                deleteUser: builder.mutation(
                    {
                        query: (id) => (
                            {
                                url: `/${id}`,
                                method:"DELETE",
                            }
                        ),
                        invalidatesTags:["todoSlice"]
                    }
                ),
                postUser: builder.mutation(
                    {
                        query: (obj) => (
                            {
                                method:"POST",
                                body: obj
                            }
                        ),
                        invalidatesTags:["todoSlice"]
                    }
                )
            }
        )
    }
)

export const { useGetDataQuery , useDeleteUserMutation , usePostUserMutation } = todoSlice