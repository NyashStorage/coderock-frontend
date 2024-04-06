// Обозначаем данные, чтобы было проще с ними работать
// и IDE точно подсказывала при помощи авто-дополнения.
export interface AuthRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
}
