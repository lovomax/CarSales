﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarSaleBackEnd.DTOs.Photos
{
    public class GetBasicPhotoDto
    {
        public string PhotoURL { get; set; } = string.Empty;
        public string PublicId { get; set; }
    }
}
