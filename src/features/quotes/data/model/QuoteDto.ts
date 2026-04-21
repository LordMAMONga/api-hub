export interface QuoteDto {
  status: string;
  data: {
    content: string;
    anime: {
      name: string;
    };
    character: {
      name: string;
    };
  };
}
