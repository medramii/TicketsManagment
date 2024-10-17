using System.Linq.Expressions;

namespace ServerApp.Contracts.Repositories;
public interface IRepositoryBase<T>
{
    Task<List<T>> GetAllAsync();
    Task<T?> FindAsync(int id);
    Task<List<T>> GetByConditionAsync(Expression<Func<T, bool>> expression, Func<IQueryable<T>, IQueryable<T>>? includeProperties = null);

    Task CreateAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);

    Task SaveAsync();
}