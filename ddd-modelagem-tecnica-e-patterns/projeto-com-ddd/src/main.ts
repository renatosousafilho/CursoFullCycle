import Customer from './entity/Customer';
import Address from './entity/Address';
import Order from './entity/Order';
import OrderItem from './entity/OrderItem';

const customer = new Customer('1', 'John Doe');
const address = new Address('Main Street', 123, 'Springfield', 'IL', '12345678');
customer.changeAddress(address);
customer.activate();

const orderItem1 = new OrderItem('1', 'Product 1', 100);
const orderItem2 = new OrderItem('2', 'Product 2', 200);

// o id do cliente é passado como valor pois faz parte de outro agregado
// os itens do pedido são passados como referência pois fazem parte do mesmo agregado
const order = new Order('1', customer._id, [orderItem1, orderItem2]);

