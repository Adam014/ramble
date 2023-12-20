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
                    <h2 className="mt-2 sm:text-xl lg:text-3xl">{item.item_name}</h2>
                    <div className="sm:block md:flex gap-5 mb-2 mt-2">
                        <p>Maximum price: <span className="custom_color">USD {item.max}</span></p>
                        <p>Average price: <span className="custom_color">USD {item.avg}</span></p>
                        <p>Minimum price: <span className="custom_color">USD {item.min}</span></p>
                    </div>
                    <div className="flex justify-end mb-2">
                        <h3 className="custom_font">{item.category_name}</h3>
                    </div>
                    <hr />
                </div>
            )),
        [data]
    );

    return <>{memoizedElements}</>;
};

export default ItemCard;