using System;

namespace Interrogas.Models.Domain
{
    public class Pollster
    {
        public int  Id { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }
        public string SiteUrl { get; set; }
        public string Location { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
