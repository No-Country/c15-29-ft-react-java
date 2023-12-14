import React from 'react'
import { Input } from "@nextui-org/react";

export default function form() {


    return (
        <>
            <article className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Create Pet</h2>
                <form className="flex flex-col gap-4">

                    <Input type="email" label="Email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                </form>
            </article>
        </>
    )
}