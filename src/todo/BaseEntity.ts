import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamptz' })  // Automatically sets the creation date
  createdAt: Date;

   // Automatically updated whenever the entity is updated
   @UpdateDateColumn({ type: 'timestamptz' })
   updatedAt: Date;
 
   // Used to mark the entity as "soft deleted", but not physically removed
   @DeleteDateColumn({ type: 'timestamptz' })
   deletedAt: Date | null;;
}
