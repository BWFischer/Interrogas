using Interrogas.Models;
using Interrogas.Models.Domain;
using Interrogas.Models.Requests.Pollsters;

namespace Interrogas.Services.Interfaces
{
    public interface IPollstersService
    {
        Paged<Pollster> Pagination(int pageIndex, int pageSize); 
        void Delete(int id);
        Pollster Get(int id);
        int Add(PollsterAddRequest model);
        void Update(PollsterUpdateRequest model);
        Paged<Pollster> SearchPagination(int pageIndex, int pageSize, string query);
     
    }
}
