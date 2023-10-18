import SaveUrlService from "../../../../../../../core/urls/application/services/SaveUrlService"

import { UrlRepository } from "../../../../../../../core/urls/application/port/out/UrlRepository";
// import { UrlModel } from "../../../../../../../core/urls/domain/UrlModel";

const longUrlInDB = "https://google.com";

const MockRepository: UrlRepository = {
    create: jest.fn(),
    findByParams: jest.fn().mockResolvedValue({
        urlId: "120213124",
        longUrl: longUrlInDB,
        shortUrl: "http://localhost:3000/gugl",
    }),
}
 
describe('SaveUrlService', () => {
    describe('run', () => {
        it('Должен принять аргументы и вызвать репозиторий', async () => {
            const longUrl = longUrlInDB;
            const customUrl = "http://localhost:3000/utub";

            const saveUrlService = new SaveUrlService(MockRepository);
            await saveUrlService.run(longUrl, customUrl);


            expect(MockRepository.findByParams).toHaveBeenCalledTimes(1);
            expect(MockRepository.findByParams).toHaveBeenCalledWith({ longUrl });
            expect(MockRepository.create).not.toHaveBeenCalled();
            // expect(repository.create).toHaveBeenCalledWith()
        })
    })
})
