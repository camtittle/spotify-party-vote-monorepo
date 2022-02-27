import { SpotifyCredentials as SpotifyCredentialsEntity } from "../entity/party";

export interface SpotifyCredentials {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export const mapToDto = (entity: SpotifyCredentialsEntity): SpotifyCredentials => {
  return {
    ...entity,
    expiresAt: new Date(entity.expiresAt)
  };
}

export const mapToEntity = (dto: SpotifyCredentials): SpotifyCredentialsEntity => {
  return {
    accessToken: dto.accessToken,
    refreshToken: dto.refreshToken,
    expiresAt: dto.expiresAt.toISOString()
  }
}
