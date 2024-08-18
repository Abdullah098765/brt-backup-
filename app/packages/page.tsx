"use client";
import { useEffect, useState } from "react";
import api from "../../apiService/globalFetchAPI";
import PackageCard from "./components/package";

export default function Packages() {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handlePurchase = async (id: string) => {
        const response = await api.post("/products/payment-link", { priceId: id });
        window.open(response.data.url, "_blank");
    };
    return (
        <div className="flex justify-center items-start text-white">
            <div className="text-center">
                <p className="text-primarySecond font-bold text-xl">Pricing</p>
                <h1 className="text-3xl font-bold">Pricing plan for vote</h1>
                <section className="lg:ml-14">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12"></div>
                        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                            {products?.map((product) => (
                                <PackageCard
                                    title={product?.name}
                                    vote={(Number(product?.default_price?.unit_amount) / 100).toString()}
                                    price={(Number(product?.default_price?.unit_amount) / 100).toString()}
                                    handleClick={() => handlePurchase(product?.default_price?.id)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
