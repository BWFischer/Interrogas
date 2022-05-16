#region Usings
using Interrogas.Data;
using Interrogas.Data.Providers;
using Interrogas.Models;
using Interrogas.Models.Domain;
using Interrogas.Models.Requests.Pollsters;
using Interrogas.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
#endregion

namespace Interrogas.Services
{
    public class PollsterService : IPollstersService
    {
        #region UserService(IDataProvider data)
        public PollsterService(IDataProvider data) 
        {
            _data = data;                         
        }
       
        IDataProvider _data = null;
        #endregion

        #region Pollsters SelectAll (Paginated)
        public Paged<Pollster> Pagination(int pageIndex, int pageSize)

        {
            Paged<Pollster> pagedList = null;
         
            List<Pollster> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Pollsters_SelectAll_Paginated]", (param) =>

            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
              (reader, recordSetIndex) =>
              {
                  Pollster aPollster = MapPollster(reader, out int startingIndex);
                  totalCount = reader.GetSafeInt32(startingIndex++);
                  
                  if (list == null)
                  {
                      list = new List<Pollster>();
                  }
                  list.Add(aPollster);
              });

            if (list != null)
            {
                pagedList = new Paged<Pollster>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region Pollsters Select_ById
        public Pollster Get(int id)

        {
            Pollster pollster = null;
            string procName = "[dbo].[Pollsters_SelectById]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id); 

            }, delegate (IDataReader reader, short set)
            {                               
                pollster = MapPollster(reader, out int startingIndex);
            });

            return pollster;

        }
        #endregion

        #region Pollsters Insert
        public int Add(PollsterAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Pollsters_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },

                returnParameters: delegate (SqlParameterCollection returnCollection)

                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);

                    Console.WriteLine("");
                });

            return id;

        }
        #endregion

        #region Pollsters Search Pagination
        public Paged<Pollster> SearchPagination(int pageIndex, int pageSize, string query)

        {
            Paged<Pollster> pagedList = null;
          
            List<Pollster> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Pollsters_Search_Paginated]", (param) =>

            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@Query", query);
            },
              (reader, recordSetIndex) =>
              {
                  Pollster aPollster = MapPollster(reader, out int startingIndex);
                  totalCount = reader.GetSafeInt32(startingIndex++);
                
                  if (list == null)
                  {
                      list = new List<Pollster>();
                  }
                  list.Add(aPollster);
              }
              );

            if (list != null)
            {
                pagedList = new Paged<Pollster>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region Pollsters Update
       
        public void Update(PollsterUpdateRequest model)
        {
            string procName = "[dbo].[Pollsters_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },

               returnParameters: null);
        }
        #endregion

        #region MapPollster
        private static Pollster MapPollster(IDataReader reader, out int startingIndex)
        {
            Pollster aPollster = new Pollster();
          
            startingIndex = 0;
            aPollster.Id = reader.GetSafeInt32(startingIndex++);  
            aPollster.Name = reader.GetSafeString(startingIndex++);
            aPollster.LogoUrl = reader.GetSafeString(startingIndex++);
            aPollster.SiteUrl = reader.GetSafeString(startingIndex++);
            aPollster.Location = reader.GetSafeString(startingIndex++);           
            aPollster.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aPollster.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aPollster;
        }
        #endregion

        #region Pollsters Delete_ById
        public void Delete(int id)

        {           
            string procName = "[dbo].[Pollsters_DeleteById]"; 

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }
        #endregion

        #region List<Pollster> Get()

        public List<Pollster> Get()
        {
            List<Pollster> pollsters = new List<Pollster>();

            return pollsters;
        }
        #endregion

        #region AddCommonParams_Pollsters
        private static void AddCommonParams(PollsterAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@LogoUrl", model.LogoUrl);
            col.AddWithValue("@SiteUrl", model.SiteUrl);
            col.AddWithValue("@Location", model.Location);            
        }
    }
    #endregion  
}

