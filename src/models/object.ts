import { Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import { Geometry, Point } from 'geojson';
import { Length, IsNotEmpty } from "class-validator";

// https://stackoverflow.com/questions/67435650/storing-geojson-points-and-finding-points-within-a-given-distance-radius-nodej/67557083#67557083
@Entity({ name: 't_test_location' })
export class Object {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @Column()
  @Length(3, 100)
  type!: string;

  @Column({ type: 'double precision', name: 'lat' })
  lat!: number;

  @Column({ type: 'double precision', name: 'long' })
  long!: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point', 
    srid: 4326,
    nullable: true,
  })
  location!: Point
}