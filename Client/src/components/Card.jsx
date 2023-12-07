import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton } from "@nextui-org/react";

export default function App({ age = "not Specified", species = "petSpecies", name = "petName", tags = [] }) {
    const [srcImg, setSrcImg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchImage = async (width, height) => {
        const customURL = `https://placekitten.com/${width}/${height}`;
        const res = await fetch(customURL);
        setSrcImg(res.url);
        setIsLoading(false);
        return res.url;
    }

    const postTest = async () => {
        fetch("https://pets-adopt-api.onrender.com/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username": "josuetheblackma2ge",
                "password": "josue"
            })
        });
    }

    useEffect(() => {
        // setTimeout placeholder to simulate loading, remove this in production
        fetchImage(270, 270);
    }, []);


    return (
        <Card className="py-4 min-w-72 w-[300px] max-w-xs">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                {isLoading ? (
                    <>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg my-2">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </>
                ) : (
                    <>
                        <p className="text-tiny uppercase font-bold">{age}</p>
                        <small className="text-default-500">{species}</small>
                        <h4 className="font-bold text-large">{name}</h4>
                    </>
                )}
            </CardHeader>
            <CardBody className="overflow-visible py-2 m-auto">
                {isLoading ? (
                    <Skeleton className="rounded-lg">
                        <div className="h-[276px] rounded-lg bg-default-300"></div>
                    </Skeleton>
                ) : (
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl select-none"
                        src={srcImg}
                        width="276px"
                        height="276px"
                        draggable={false}
                    />
                )}
            </CardBody>
        </Card>
    );
}
