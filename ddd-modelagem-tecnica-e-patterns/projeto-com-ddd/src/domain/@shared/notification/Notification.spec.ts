import Notification from './Notification';

describe('Notification', () => {
  it('should add an error', () => {
    const notification = new Notification();
    notification.addError('Error message', 'customer');
    expect(notification.hasErrors()).toBe(true);
  });

  it('should return the error messages for a context', () => {
    // Arrange
    const notification = new Notification();

    // Act
    notification.addError('Error message', 'customer');
    notification.addError('Error message', 'product');

    // Assert
    expect(notification.messages('customer')).toBe('customer: Error message');
    expect(notification.messages('product')).toBe('product: Error message');
  });

  it('should return the error messages for all contexts', () => {
    // Arrange
    const notification = new Notification();

    // Act
    notification.addError('Error message', 'customer');
    notification.addError('Error message', 'product');

    // Assert
    expect(notification.messages()).toBe('customer: Error message,product: Error message');
  });
});