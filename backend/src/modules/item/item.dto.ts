import { ToNumber } from '../../utils/transform';
import {
  BidItemInput,
  BidStatus,
  CreateItemInput,
  ItemFilterInput,
  PublishItemInput,
} from '../../graphql';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ItemFilterDto implements ItemFilterInput {
  @IsOptional()
  @IsEnum(BidStatus)
  bidStatus?: BidStatus;
}

export class CreateItemDto implements CreateItemInput {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsNumber()
  @ToNumber()
  @Min(1)
  startedPrice: number;

  @IsNumber()
  @ToNumber()
  @Min(1)
  duration: number; // hour
}

export class PublishItemDto implements PublishItemInput {
  @IsMongoId()
  id: string;
}

export class BidItemDto implements BidItemInput {
  @IsMongoId()
  id: string;

  @IsNumber()
  @ToNumber()
  @Min(1)
  price: number;
}
