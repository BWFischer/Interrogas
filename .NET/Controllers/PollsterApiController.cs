#region Usings
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Interrogas.Models;
using Interrogas.Models.Domain;
using Interrogas.Models.Requests.Pollsters;
using Interrogas.Services.Interfaces;
using Interrogas.Web.Controllers;
using Interrogas.Web.Models.Responses;
using System;
#endregion

namespace Interrogas.Web.Api.Controllers
{
    #region Pollsters Route
    [Route("api/pollsters")]
    [ApiController]
    #endregion

    #region PollsterApiController1 & BaseApiController

    public class PollsterApiController : BaseApiController
    {
        private IPollstersService _service = null;
      
        public PollsterApiController (IPollstersService service, ILogger<PollsterApiController> logger) :base(logger)
        {
            _service = service;           
        }
        #endregion

        #region Pollsters SelectAll (Paginated)

        [HttpGet("paginate")]

        public ActionResult<ItemResponse<Paged<Pollster>>> Pagination(int pageIndex, int pageSize)
        {                     
            ActionResult result = null;

            try
            {
                Paged<Pollster> page = _service.Pagination(pageIndex, pageSize);

                if (page == null)
                {
                    result = NotFound404(new ErrorResponse("Pagination Resource Not Found."));
                }
                else
                {
                    ItemResponse<Paged<Pollster>> response = new ItemResponse<Paged<Pollster>>();
                    response.Item = page;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        #endregion

        #region Pollsters Select_ById
        
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Pollster>> GetById(int id)
        {
            int icode = 200;
            BaseResponse response = null;

            try
            {
                Pollster pollster= _service.Get(id);

                if (pollster == null)
                {
                    icode = 404;
                    response = new ErrorResponse("This Application Resource (Pollster) Was Not Found.");
                }

                else
                {
                    response = new ItemResponse<Pollster>() { Item = pollster };
                }
            }

            catch (ArgumentException argex)
            {
                icode = 500;
                response = new ErrorResponse($"argumentexception errors {argex.Message}");
                base.Logger.LogError(argex.ToString());
            }

            return StatusCode(icode, response);

        }

        #endregion

        #region Pollsters DeleteById 
        
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(code, response);
        }
        #endregion

        #region Pollsters Insert
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(PollsterAddRequest model)
        {                          
            ObjectResult result = null;
            try
            {                                       
                int id = _service.Add(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
              
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return (result);
        }
        #endregion

        #region Pollsters Update 
        [HttpPut("{id:int}")]
        public ActionResult Update(PollsterUpdateRequest model)
        {
            // the new address
            _service.Update(model);

            SuccessResponse response = new SuccessResponse();

            return Ok(response);
        }
        #endregion

        #region Pollsters Search (Paginated)

        [HttpGet("search")]

        public ActionResult<ItemResponse<Paged<Pollster>>> SearchPagination(int pageIndex, int pageSize, string Query)
        {
            ActionResult result = null;

            try
            {
                Paged<Pollster> page = _service.SearchPagination(pageIndex, pageSize, Query);

                if (page == null)
                {

                    result = NotFound404(new ErrorResponse("Search Pagination Resource Not Found."));
                }
                else
                {
                    ItemResponse<Paged<Pollster>> response = new ItemResponse<Paged<Pollster>>();
                    response.Item = page;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        #endregion

    }  
}

