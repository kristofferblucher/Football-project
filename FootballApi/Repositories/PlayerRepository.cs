// using FootballApi.Controller;
// using FootballApi;
// using Microsoft.EntityFrameworkCore;

// namespace FootballApi.Repositories
// {
//     public class PlayerRepository : IPlayerRepository
//     {
//         DataContext _db;

//         public PlayerRepository(DataContext db)
//         {
//             _db = db;
//         }

//         public async Task<List<Player>> GetAllBooks()
//         {
//             return await _db.Books.Include(b => b.Author).Include(b => b.Publisher).ToListAsync();

//         }

//         public async Task<Player> GetPlayerById(int id)
//         {
            
//         }
        

//         public async Task<Player> CreateBook(Player entity)
//         {
//             await _db.Books.AddAsync(entity);
//             await _db.SaveChangesAsync();
//             return entity;
        
        
        
//         }

//         public async Task<Player> UpdateBookAuthor(int bookId, int authorId)
        
//         {

//             var book = await _db.Books.FirstOrDefaultAsync( b => b.Id == bookId);
//             var author = await _db.Authors.FirstOrDefaultAsync( a => a.Id == authorId);
//             book.AuthorId = authorId;
//             book.Author = author;

//             if (book != null || author != null)
//             {
//                 _db.Books.Update(book);
//                 await _db.SaveChangesAsync();

//                 return book;
//             }

//             else return null;

//         }

//         public async Task<Player> DeleteBook(int id)
//         {
//             Player player = GetPlayerById(id).Result; 
//             _db.Books.Remove(book);
//             await _db.SaveChangesAsync();
//             return book;
//         }



//     }
// }