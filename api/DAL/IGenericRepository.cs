using System.Linq.Expressions;
using api.Models;

namespace api.DAL{
    public interface IGenericRepository<T>{
        Task<List<T>> GetAll();
        Task<IEnumerable<T>> GetEntityById(Expression<Func<T,bool>> expression, string includeProperties);
        Task<IEnumerable<T>> GetEntityByExpression(Expression<Func<T,bool>>? expression,Func<IQueryable<T>, IEnumerable<T>> orderBy, string includeProperties);
        IQueryable<T> UsePagination(IEnumerable<T> collection,Pagination paging);
        // List<object> SendBackTotalData(List<T> collection,Pagination paging);
         void Add(T entity);
         void Update(T entity);
         void Delete(T entity);
         void DeleteById(int id);
    }
}