import { IsString } from 'class-validator';

export class FindSubscriptionByFirebaseUidDto {
    @IsString()
    firebaseUid: string;
}
