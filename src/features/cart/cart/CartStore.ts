export interface CartItem {
    id: string;
    title: string;
    subtitle?: string;
    image: any;
    sizes?: string[];
    price: number;
    qty?: number;
    size?: string;
    deliveryText?: string;
}

class CartStore {
    private items: CartItem[] = [];
    private listeners: (() => void)[] = [];

    getItems() {
        return this.items;
    }

    addItem(item: CartItem) {
        const existing = this.items.find((i) => i.id === item.id && i.size === item.size);
        if (existing) {
            existing.qty = (existing.qty || 1) + (item.qty || 1);
        } else {
            this.items.push(item);
        }
        this.notifyListeners();
    }

    removeItem(id: string) {
        this.items = this.items.filter((i) => i.id !== id);
        this.notifyListeners();
    }

    updateQty(id: string, qty: number) {
        const item = this.items.find((i) => i.id === id);
        if (item) {
            item.qty = qty;
            this.notifyListeners();
        }
    }

    clear() {
        this.items = [];
        this.notifyListeners();
    }

    subscribe(listener: () => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach((l) => l());
    }
}

export const cartStore = new CartStore();
