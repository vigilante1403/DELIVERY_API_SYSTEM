using System.Linq.Expressions;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.DAL{
    public class GenericRepository<T>:IGenericRepository<T> where T:class{
        private readonly ApplicationDbContext _db;
        
        public GenericRepository(ApplicationDbContext db){
            _db=db;
        }
        public async Task<List<T>> GetAll(){
            return await _db.Set<T>().ToListAsync();
        }
        
        public async Task<IEnumerable<T>> GetEntityById(Expression<Func<T,bool>> expression, string includeProperties){
           return await GetEntityByExpression(expression,null,includeProperties);
        }
        public async Task<IEnumerable<T>> GetEntityByExpression(Expression<Func<T,bool>>? expression,Func<IQueryable<T>, IEnumerable<T>> orderBy, string includeProperties)
        {
            IQueryable<T> query =  _db.Set<T>().AsQueryable();
            if (expression != null)
            {
                query = query.Where(expression);
            }
            if(includeProperties!=null && includeProperties != "")
            {
                string[] splited = includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string s in splited)
                {
                    query = query.Include(s);
                }
            }
            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            return query.ToList();

        }
        public void Add(T entity){
             try
    {
        _db.Set<T>().Add(entity);
        _db.SaveChanges();
    }
    catch (DbUpdateException ex)
    {
        // Log the error details
        Console.WriteLine($"Error saving changes: {ex.Message}");

        // Log the inner exception details for more information
        Exception innerException = ex.InnerException;
        while (innerException != null)
        {
            Console.WriteLine($"Inner Exception: {innerException.Message}");
            innerException = innerException.InnerException;
        }

        // Optionally, you can rethrow the exception for further handling
        throw;
    }
        }
        public void Update(T entity){
            _db.Set<T>().Attach(entity);
            _db.Entry(entity).State=EntityState.Modified;
        }
        public void Delete(T entity){
            if(_db.Entry(entity).State==EntityState.Detached){
                _db.Set<T>().Attach(entity);
            }
            _db.Set<T>().Remove(entity);
        }
        public void DeleteById(int id){
            T? entity = _db.Set<T>().Find(id);
            if(entity!=null){
                Delete(entity);
            }
            
        }

        public IQueryable<T> UsePagination(IEnumerable<T> collection, Pagination paging)
        {
            return collection.AsQueryable().Skip((paging.Page-1)*paging.PageSize).Take(paging.PageSize);
        }



        // public  List<object> SendBackTotalData(List<T> collection, Pagination paging)
        // {
        //     int totalPages =(int)Math.Ceiling((double)collection.Count()/paging.PageSize);
        //     PageList pagelist = new PageList{
        //         currentPage=paging.Page,
        //         totalPages=totalPages
        //     };
        //     List<object> listObject = new List<object>
        //     {
        //         pagelist
        //     };
        //     foreach(var item in collection){
        //         listObject.Add(item);
        //     }
        //     return listObject;
        // }
    }
}