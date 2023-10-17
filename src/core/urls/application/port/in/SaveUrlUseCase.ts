export interface SaveUrlUseCase {
    run(longUrl: string, customUrl?: string): Promise<{
        shortUrl: string;
    }>;
}
