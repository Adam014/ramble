import React, { FC, useMemo } from "react";

interface Item {
    good_id: number;
    avg: number;
    max: number;
    min: number;
    measure: string;
    item_name: string;
    category_name: string;
    currency_code: string;
}

interface ItemProps {
    data: Item[],
}

const ItemCard: FC<ItemProps> = ({ data }) => {
    const memoizedElements = useMemo(
        () =>
            data?.map((item) => (
                // TODO: Refactor this design by the design in figma
                <div key={item.good_id}>
                    <h2>{item.item_name}</h2>
                </div>
            )),
        [data]
    );

    return <>{memoizedElements}</>;
};

export default ItemCard;