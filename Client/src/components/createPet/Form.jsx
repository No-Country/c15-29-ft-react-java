import React, { useState } from 'react'
import { Input, Select, SelectItem } from "@nextui-org/react";

export default function form() {
    const [inputInfo, setInputInfo] = useState("hola");
    const sizes = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
    ];

    return (
        <>
            <article className="flex flex-col gap-4 w-full">
                <h2 className="text-2xl font-bold">Create Pet</h2>
                <form className="flex flex-col gap-4">
                    <Input type="text" label="Pet Name" placeholder="Pet Name / Alias" variant='underlined' labelPlacement="outside" isRequired />
                    <Input type="text" label="Species" placeholder="Species" variant='underlined' labelPlacement="outside" isRequired />
                    <Input type="number" label="Age" placeholder="Age" variant='underlined' labelPlacement="outside" isRequired />
                    <Input type="" label="Size" placeholder="Size" variant='underlined' labelPlacement="outside" isRequired />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4" >
                        <Select
                            label="Select animal size"
                            placeholder="Size"
                            className="max-w-xs"
                            variant='underlined' isRequired>
                            {sizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Input type="email" label="Health Status" placeholder="Health status" variant='underlined' labelPlacement="outside" isRequired />
                    <Input type="email" label="Behavior" placeholder="Behavior" variant='underlined' labelPlacement="outside" isRequired />
                    <Input type="email" label="Location" placeholder="Location" variant='underlined' labelPlacement="outside" isRequired />
                    <Input type="email" label="Description" placeholder="Description" variant='underlined' labelPlacement="outside" isRequired={true} isClearable value={inputInfo} onClear={() => setInputInfo("")} onChange={(e) => setInputInfo(e.target.value)} />
                </form>
            </article>
        </>
    )
}