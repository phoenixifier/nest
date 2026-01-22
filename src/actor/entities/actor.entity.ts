import {
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	ManyToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { MovieEntity } from "../../movie/entities/movie.entity";

@Entity("actors")
export class ActorEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", length: 50, nullable: false })
	name: string;

	@ManyToMany(
		() => MovieEntity,
		(movie) => movie.actors,
	)
	movies: MovieEntity[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
