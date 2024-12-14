export class DeliveryOrders {
    id: string;
    date_received: Date;
    waste_weight: number;
    compost?: number;
    peso_balde?: number;
    deletedAt?: Date;
    isGathering?: boolean;
}

export class DeliveryOrdersBySubscription {
    delivery_orders: DeliveryOrders[];
    total: number;
}
