import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import emailJs from "@emailjs/browser";

export function ContactForm({ children }: { children: React.ReactNode }) {
    const [isMount, setIsMount] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("id ", process.env.NEXT_PUBLIC_SERVICE_ID);

        emailJs
            .send(
                process.env.NEXT_PUBLIC_SERVICE_ID!,
                process.env.NEXT_PUBLIC_TEMPLATE_ID!,
                {
                    from_name: formData.name,
                    to_name: "Shuaibu Shehu",
                    from_email: formData.email,
                    to_email: "shuaibushehukalifa@gmail.com",
                    message: formData.message,
                },
                process.env.NEXT_PUBLIC_PUBLIC_KEY
            )
            .then((res) => {
                console.log("success ", res);
                //
            })
            .catch((err) => {
                console.log("errir ", err);
                //
            });

        console.log(formData);
        console.log(process.env.SERVICE_ID);
    };

    useEffect(() => {
        setIsMount(true);
    }, []);

    if (!isMount) return null;

    return (
        <div className="z-[999]">
            <Popover>
                <PopoverTrigger>
                    {children}
                </PopoverTrigger>
                <PopoverContent className="w-[400px] m-auto z-[999] p-6 rounded-lg shadow-lg border-none">
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className=" z-[999] flex flex-col gap-2"
                    >
                        <div className="flex flex-col gap-1 outline-none">
                            <label htmlFor="name">Name:</label>
                            <Input
                                className=" focus-visible:ring-blue-500"
                                onChange={(e) => handleChange(e)}
                                type="text"
                                id="name"
                                placeholder=" Enter Name"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email:</label>
                            <Input
                                className=" focus-visible:ring-blue-500"
                                onChange={(e) => handleChange(e)}
                                type="email"
                                id="email"
                                placeholder=" Enter Email"
                                
                            />
                        </div>
                        <div>
                            <Textarea
                                className=" focus-visible:ring-blue-500"
                                onChange={(e) => handleChange(e)}
                                id="message"
                                placeholder="Enter Message"
                            />
                        </div>
                        <Button
                            className="bg-blue-800 hover:bg-blue-700 "
                        >Send</Button>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
}