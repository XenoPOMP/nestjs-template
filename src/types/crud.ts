import { Method } from '@/decorators/endpoint';

/**
 * Dict of generic CRUD operations, like read, create etc.
 */
export const CRUDOperations = {
  Create: 'POST',
  Read: 'GET',
  Update: 'PUT',
  Delete: 'DELETE',
} satisfies Record<string, Method>;
