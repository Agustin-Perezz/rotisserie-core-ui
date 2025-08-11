export type HandleSubmitForm<T> = {
  handleSubmit: (values: T) => Promise<void>;
};
