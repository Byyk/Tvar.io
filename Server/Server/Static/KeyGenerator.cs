using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekt.Model.Static
{
  public static class KeyGenerator
  {
    private static int a = 1664525;
    private static int c = 1013904223;
    private static int m = (int)Math.Pow(2, 32);
    private static double seed = GetMillis();

    private static string Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static string GenerateKey(byte length)
    {
      string a = "";
      for (int i = 0; i < length; i++)
      {
        a += Chars[random()];
      }

      return a.ToUpper();
    }

    static int random()
    {
      seed = (a * seed + c) % m;
      return (int)(Math.Abs(seed / m) * Chars.Length);
    }

    static double GetMillis()
    {
      return DateTime.Now.ToUniversalTime()
        .Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc))
        .TotalMilliseconds;
    }
  }
}
