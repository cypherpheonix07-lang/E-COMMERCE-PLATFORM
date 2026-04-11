const OrderTimeline = ({ orders, products, onReorder }) => {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-background p-6 shadow-glass">
      <h3 className="text-2xl font-semibold text-foreground">Order timeline</h3>
      <div className="mt-6 space-y-6">
        {orders.map((order, index) => (
          <div key={order.id} className="rounded-3xl border border-border/70 bg-surface p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-accent/80">{order.status}</p>
                <h4 className="mt-2 text-xl font-semibold text-foreground">{order.title}</h4>
                <p className="mt-2 text-sm text-foreground/70">Placed on {order.date}</p>
              </div>
              <button type="button" onClick={() => onReorder(order.items)} className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accentForeground">
                Reorder
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {order.items.map((item) => {
                const product = products.find((product) => product.id === item.productId);
                return (
                  product && (
                    <div key={item.productId} className="rounded-3xl border border-border/70 bg-background p-4">
                      <p className="font-semibold text-foreground">{product.name}</p>
                      <p className="mt-2 text-sm text-foreground/70">Qty: {item.quantity}</p>
                      <p className="mt-2 text-sm text-accent">${product.price * item.quantity}</p>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderTimeline;
