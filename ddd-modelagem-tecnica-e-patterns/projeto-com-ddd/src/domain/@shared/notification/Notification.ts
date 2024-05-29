interface NotificationProps {
  message: string;
  context: string;
};

export default class Notification {
  private _errors: NotificationProps[] = [];

  addError(message: string, context: string) {
    this._errors.push({ message, context });
  }

  hasErrors() {
    return this._errors.length > 0;
  }

  get errors() {
    return this._errors;
  }

  messages(context?: string) {
    return this._errors
      .filter(error => !context || error.context === context)
      .map(error => `${error.context}: ${error.message}`)
      .join(',');
  }
}