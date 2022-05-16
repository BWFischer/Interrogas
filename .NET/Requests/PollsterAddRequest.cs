using System.ComponentModel.DataAnnotations;

namespace Interrogas.Models.Requests.Pollsters
{
    public class PollsterAddRequest
    {
		[Required]
		[StringLength(200, MinimumLength = 2)]
		public string Name { get; set; }
		
		[StringLength(200, MinimumLength = 2)]
		public string LogoUrl { get; set; }
		
		[StringLength(200, MinimumLength = 2)]
		public string SiteUrl { get; set; }
		
		[StringLength(200, MinimumLength = 2)]
		public string Location { get; set; }		
	}
}
