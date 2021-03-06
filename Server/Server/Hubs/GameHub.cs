﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Projekt.Model.Static;

namespace Server.Hubs
{
  public class GameHub : Hub
  {
    private static readonly List<string> GroupsList = new List<string>();

    public async Task JoinRoom(string roomName)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
      await Clients.Group(roomName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {roomName}.");
      if(!GroupsList.Contains(roomName)) GroupsList.Add(roomName);
    }

    public async Task JoinRandomRoom()
    {
      string roomName;
      if (GroupsList.Any())
      {
        var rand = new Random();
        roomName = GroupsList[rand.Next(0, GroupsList.Count)];
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
      }

      roomName = KeyGenerator.GenerateKey(6);
      await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
      await Clients.Group(roomName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {roomName}.");
    }

    public async Task LeaveRoom(string roomName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
      await Clients.Group(roomName).SendAsync("Send", $"{Context.ConnectionId} has left the group {roomName}.");
    }

    public async Task SendMessage(string user, string message)
    {
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
  }
}
