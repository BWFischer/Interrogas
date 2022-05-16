using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Pollsters
{
    public class PollsterUpdateRequest : PollsterAddRequest, IModelIdentifier
    {
        [Range(1, int.MaxValue)]      
        public int Id { get; set; }
    }
}
