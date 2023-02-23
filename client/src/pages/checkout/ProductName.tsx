import { FC, useEffect, useState } from "react";
import { GET_PRODUCTS } from "../../api";

export const ProductName: FC<{ productId: string }> = ({ productId }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        GET_PRODUCTS({ _id: productId })
            .then((data) => {
                setName(data.data.results[0]?.name ?? '')
            })
            .catch((err) => console.error(err));
    }, [productId]);

    return <>{name}</>
}
