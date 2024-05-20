import Customer from './domain/customer/entity/Customer';
import Address from './domain/customer/entity/Address';
import Order from './domain/checkout/entity/Order';
import OrderItem from './domain/checkout/entity/OrderItem';

const customer = new Customer('1', 'John Doe');
const address = new Address('Main Street', 123, 'Springfield', 'IL', '12345678');
customer.changeAddress(address);
customer.activate();

const orderItem1 = new OrderItem("i1", "p1", "Item 1", 10, 2);
const orderItem2 = new OrderItem("i2", "p2", "Item 2", 20, 1)

// o id do cliente é passado como valor pois faz parte de outro agregado
// os itens do pedido são passados como referência pois fazem parte do mesmo agregado
const order = new Order('1', customer.id, [orderItem1, orderItem2]);

