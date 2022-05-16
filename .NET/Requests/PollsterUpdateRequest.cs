using System;
using System.ComponentModel.DataAnnotations;

namespace Interrogas.Models.Requests.Pollsters
{
    public class PollsterUpdateRequest : PollsterAddRequest, IModelIdentifier
    {
        [Range(1, int.MaxValue)]      
        public int Id { get; set; }
    }
}
